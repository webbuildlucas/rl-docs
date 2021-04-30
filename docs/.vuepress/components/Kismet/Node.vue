<template>
    <div class="kismet-node">
        <!-- A description of the kismet node -->
        <p v-if="node.description"> {{ node.description }}</p>
        <!-- The image of the kismet node -->
        <img :src="imagePath(node)" v-bind:alt="node.name">
        <!-- A list of all links (input, output and variable) and properties -->
        <ul>
            <div v-if="node.properties.length > 0">
                <KismetNodeProperty header="Properties" :properties="node.properties"/>
            </div>

            <div v-if="node.links.input">
                <KismetNodeProperty header="Input links" :properties="node.links.input"/>
            </div>

            <div v-if="node.links.output">
                <KismetNodeProperty header="Output links" :properties="node.links.output"/>
            </div>

            <div v-if="node.links.variable">
                <KismetNodeProperty header="Variable links" :properties="node.links.variable"/>
            </div>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        node: {
            type: Object,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },

    methods: {
        imagePath(node) {

            let name = node.name.toLowerCase().replaceAll(' ','_');
            let categoryName = this.category[0].toUpperCase() + this.category.slice(1);

            return `/images/kismet/${categoryName}/${node.package}/${name}.png`;
        }
    }
}
</script>

<style scoped>
.kismet-node {
    background-color: var(--codeBgColor);
    padding: .8rem;
}
</style>