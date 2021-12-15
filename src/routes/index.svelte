<script lang="ts">
    export const templates = ['test']
</script>

<h1>Commercial Templates</h1>

<ol>
    {#each templates as template}
        <li><a href={`/${template}`}>{template.slice(0,1).toUpperCase() + template.slice(1)}</a></li>
    {/each}
</ol>
