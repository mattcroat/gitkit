import { goto, invalidate } from '$app/navigation'

/*
  Progressive enhancement for forms:
  https://github.com/sveltejs/kit/blob/master/packages/create-svelte/templates/default/src/lib/form.ts
  
  If SvelteKit 1.0 releases the <Form /> component like Remix
  as part of the framework it should be used instead.
*/

type Enhance = (
	form?: HTMLFormElement,
	{ pending, error, result }?: Parameters
) => Destroy

type Parameters = {
	pending?: ({ data, form }: { data: FormData; form: HTMLFormElement }) => void
	error?: ({
		data,
		form,
		response,
		error
	}: {
		data: FormData
		form: HTMLFormElement
		response: Response | null
		error: Error | null
	}) => void
	result?: ({
		data,
		form,
		response
	}: {
		data: FormData
		response: Response
		form: HTMLFormElement
	}) => void
	redirect?: string
}

type Destroy = { destroy: () => void }

export const enhance: Enhance = (
	form,
	{ pending, error, result, redirect } = {}
) => {
	let currentToken: unknown

	async function handleSubmit(event: Event) {
		event.preventDefault()

		const token = (currentToken = {})
		const data = new FormData(form)

		if (pending) pending({ data, form })

		try {
			const response = await fetch(form.action, {
				method: form.method,
				headers: {
					accept: 'application/json'
				},
				body: data
			})

			if (token !== currentToken) return

			if (response.ok) {
				if (result) result({ data, form, response })

				if (redirect) {
					goto(redirect)
					return
				}

				const url = new URL(form.action)
				url.search = ''
				url.hash = ''
				invalidate(url.href)
			} else if (error) {
				error({ data, form, error: null, response })
			} else {
				console.error(await response.text())
			}
		} catch (error) {
			if (error) {
				error({ data, form, error, response: null })
			} else {
				throw error
			}
		}
	}

	form.addEventListener('submit', handleSubmit)

	return {
		destroy() {
			form.removeEventListener('submit', handleSubmit)
		}
	}
}
