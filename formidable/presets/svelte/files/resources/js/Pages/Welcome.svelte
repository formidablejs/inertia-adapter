<script>
    export let counter = 0;
    export let formidableVersion;
    export let nodeVersion;
</script>

<div class="container">
    <div class="content">
        <div class="logo">
            <img src="/formidable.png" alt="Formidable Logo" />
            <p>+</p>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" alt="Svelte Logo" />
        </div>

        <div class="welcome">
            <h4>Yey! You have successfully created a new Formidable project.</h4>
        </div>

        <div class="counter">
            <button on:click={() => counter++}>
                Clicked {counter} times
            </button>
        </div>

        <ul class="links">
            <li>
                <a href="https://formidablejs.org/" target="_blank" rel="noopener"> Formidable </a>
            </li>

            <li>
                <a href="https://svelte.dev/" target="_blank" rel="noopener"> Svelte </a>
            </li>

            <li>
                <a href="https://github.com/formidablejs" target="_blank" rel="noopener"> Github </a>
            </li>

            <li>
                <a href="https://twitter.com/formidablejs" target="_blank" rel="noopener"> Twitter </a>
            </li>
        </ul>

        <div class="information">
            Formidable v{ formidableVersion ?? "undefined" } (Node { nodeVersion ?? "undefined" })
        </div>
    </div>
</div>
