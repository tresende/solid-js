import { createSignal, For, Show } from 'solid-js'

import styles from './App.module.css'

const App = () => {
  const [isLoading, setIsLoading] = createSignal<boolean>()
  const [randomizedItem, setRandomizedItem] = createSignal('')
  const [items, setItems] = createSignal<string[]>([])

  const addItem = () => {
    setItems(items().concat(''))
  }

  const randomize = () => {
    setIsLoading(true)
    const index = Math.floor(Math.random() * items().length)
    setRandomizedItem(items()[index])
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleChange = (index: number, value: string) => {
    const data = [...items()]
    data[index] = value
    setItems(data)
  }

  return (
    <div class={styles.App}>
      <button onClick={addItem}>Add Item</button>
      <For each={items()}>
        {(_, index) => (
          <div>
            <label for={`field-${index()}`}>{`field-${index()}`}</label>
            <input
              value={items()[index()]}
              onChange={(e) => handleChange(index(), e.currentTarget.value)}
              type="text"
              id={`field-${index()}`}
            />
          </div>
        )}
      </For>
      <Show when={isLoading() === undefined}>
        <button type="button" onClick={randomize}>
          Randomize it!
        </button>
      </Show>

      <img
        style={{ display: isLoading() ? 'block' : 'none' }}
        src="https://media.tenor.com/J4XSBiMtAZMAAAAC/bongo-cat-drum.gif"
        class={styles.loading}
      />

      <Show when={isLoading() === false}>
        <p>Result is: {randomizedItem}</p>
      </Show>
    </div>
  )
}

export default App
