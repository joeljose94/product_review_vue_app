app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template:
        /*html*/
        `
    <!-- List Rendering -->
    <ul>
        <li v-for="detail in details">
            {{ detail }}
        </li>
    </ul>
    `
})