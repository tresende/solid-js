import { createSignal, For, Show } from 'solid-js'

import styles from './App.module.css'

const App = () => {
  const [isLoading, setIsLoading] = createSignal<boolean>()
  const [randomizedItem, setRandomizedItem] = createSignal('')
  const [items, setItems] = createSignal<string[]>([])
  const [loading, setLoading] = createSignal(0)

  const addItem = () => {
    setItems(items().concat(''))
  }

  const randomize = () => {
    setIsLoading(true)
    const index = Math.floor(Math.random() * items().length)
    setRandomizedItem(items()[index])
    const id = setInterval(() => setLoading(loading() + 5), 100)
    setTimeout(() => {
      setIsLoading(false)
      clearInterval(id)
    }, 2000)
  }

  const handleChange = (index: number, value: string) => {
    const data = [...items()]
    data[index] = value
    setItems(data)
  }

  return (
    <div class={styles.container}>
      <section class="topic">
        <h2 id="about">
          <a href="#about">#</a>Randomizer
        </h2>{' '}
        <p>Add more than one item to raffle a list item.</p>
      </section>

      <Show when={isLoading() === undefined}>
        <button onClick={addItem}>Add Item</button>
        <section class="topic">
          <For each={items()}>
            {(_, index) => (
              <div class={styles.field}>
                <label for={`field-${index()}`}>{`Item ${index() + 1}`}</label>
                <input
                  value={items()[index()]}
                  onChange={(e) => handleChange(index(), e.currentTarget.value)}
                  type="text"
                  class="nes-input"
                  id={`field-${index()}`}
                />
              </div>
            )}
          </For>
        </section>
      </Show>

      <Show when={isLoading() === undefined && items().length > 1}>
        <div class={styles.field}>
          <button type="button" onClick={randomize} class="nes-btn is-primary">
            Randomize it!
          </button>
        </div>
      </Show>

      <img
        style={{ display: isLoading() ? 'block' : 'none' }}
        src="https://media.tenor.com/J4XSBiMtAZMAAAAC/bongo-cat-drum.gif"
        class={styles.loading}
      />
      <Show when={isLoading()}>
        <progress class="nes-progress is-primary" value={loading()} max="100"></progress>
      </Show>
      <Show when={isLoading() === false}>
        <div class={styles.result}>
          <p class="nes-balloon from-left nes-pointer">
            <i class="nes-icon trophy is-medium"></i>Result is: <b>{randomizedItem}</b>
          </p>
        </div>
      </Show>
    </div>
  )
}

export default App
