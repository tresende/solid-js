import { createSignal, For, Show } from 'solid-js'

import styles from './App.module.css'

const TIMEOUT = 2000

const App = () => {
  const [isLoading, setIsLoading] = createSignal<boolean>()
  console.log('Render')
  const [randomizedItem, setRandomizedItem] = createSignal('')
  const [items, setItems] = createSignal<string[]>([])
  const [loading, setLoading] = createSignal(0)

  const addItem = () => {
    setItems(items().concat(''))
    document.getElementById(`field-${items().length - 1}`)?.focus()
  }

  const randomize = () => {
    setIsLoading(true)
    const { length } = items().filter((item) => item)
    const index = Math.floor(Math.random() * length)
    setRandomizedItem(items()[index])
    const id = setInterval(() => setLoading(loading() + 5), TIMEOUT / 20)
    setTimeout(() => {
      setIsLoading(false)
      clearInterval(id)
    }, TIMEOUT)
  }

  const handleChange = (index: number, value: string) => {
    const data = [...items()]
    data[index] = value
    setItems(data)
  }

  const onSubmit = (event: KeyboardEvent, index: number, value: string) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    handleChange(index, value)
    addItem()
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
        <section class="topic">
          <For each={items()}>
            {(_, index) => (
              <div class={styles.field}>
                <label for={`field-${index()}`}>{`Item ${index() + 1}`}</label>
                <input
                  onKeyDown={(e) => onSubmit(e, index(), e.currentTarget.value)}
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
        <div class={styles.field}>
          <button class="nes-btn is-primary" onClick={addItem}>
            Add Item
          </button>
          <Show when={isLoading() === undefined && items().length > 1}>
            <button type="button" onClick={randomize} class="nes-btn is-success">
              Randomize it!
            </button>
          </Show>
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
