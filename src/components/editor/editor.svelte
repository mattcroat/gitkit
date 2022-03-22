<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import type monaco from 'monaco-editor'
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
	import type { EditorPostType } from '$root/types'

	let editorEl: HTMLDivElement
	let editor: monaco.editor.IStandaloneCodeEditor

	const post: EditorPostType = getContext('post')
	let loading = true

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker(_: any, label: string) {
				switch (label) {
					case 'json':
						return new jsonWorker()
					case 'css':
						return new cssWorker()
					case 'html':
					case 'handlebars':
					case 'razor':
						return new htmlWorker()
					case 'typescript':
					case 'javascript':
						return new tsWorker()
					default:
						return new editorWorker()
				}
			}
		}

		// using a dynamic import to lazy load the editor
		const monaco = await import('monaco-editor')

		editor = monaco.editor.create(editorEl, {
			value: $post.markdown,
			language: 'markdown',
			lineNumbers: 'off',
			theme: 'vs-dark',
			minimap: { enabled: false },
			fontFamily: 'Poppins',
			fontSize: 18,
			tabSize: 2,
			wordWrap: 'on',
			cursorBlinking: 'solid',
			automaticLayout: true,
			scrollBeyondLastLine: false,
			smoothScrolling: true,
			scrollbar: {
				useShadows: false,
				verticalScrollbarSize: 2
			},
			renderLineHighlight: 'none'
		})

		loading = false

		editor.onDidChangeModelContent(() => {
			$post.markdown = editor.getValue()
		})

		return () => {
			editor.dispose()
		}
	})
</script>

{#if loading}
	<span class="placeholder">✍️ Loading...</span>
{/if}

<div bind:this={editorEl} class="editor" class:loading />

<style>
	.placeholder {
		display: grid;
		place-content: center;
		font-size: 2rem;
		background-color: hsl(0 0% 12%);
	}

	.loading {
		display: none;
	}
</style>
