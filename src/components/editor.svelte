<script lang="ts">
	import { onMount } from 'svelte'
	import type monaco from 'monaco-editor'
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

	let editorEl: HTMLDivElement
	let editor: monaco.editor.IStandaloneCodeEditor

	export let markdown: string

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
			value: markdown,
			language: 'markdown',
			lineNumbers: 'off',
			theme: 'vs-dark',
			minimap: { enabled: false },
			fontSize: 18,
			tabSize: 2,
			wordWrap: 'on',
			cursorBlinking: 'solid'
		})

		editor.onDidChangeModelContent(() => {
			markdown = editor.getValue()
		})

		return () => {
			editor.dispose()
		}
	})
</script>

<div bind:this={editorEl} class="editor" />

<style>
	.editor {
		height: 100%;
	}
</style>
