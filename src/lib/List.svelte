<script lang="ts">
    export const sizes = [300, 600, 900, 1200, 1800, 2400];
</script>

<ul>
     {#each sizes as size}
        <li>{size}</li>
     {/each}
</ul>