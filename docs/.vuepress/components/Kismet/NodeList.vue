<template>
    <div class="kismet-container" :class="category" v-if="nodes.length > 0">
        <h3>{{ category }}</h3>
        <div v-for="node in nodes" :key="node.name">
            <div v-if="category === `${node.type}s` && node.package === upk">
                <div class="node-header" v-on:click="toggle(node)">
                    <a>
                        {{ node.name }}
                    </a>

                    <span v-show="!Ishidden(node)">&#9660;</span>
                    <span v-show="Ishidden(node)">&#9650;</span>
                </div>
                <div v-show="Ishidden(node)">
                    <KismetNode :node="node" :category="category"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TAGameData from '../../public/data/kismet_nodes.json';

export default {
    props: {
        category: {
            type: String,
            required: true
        },
        upk: {
            type: String,
            required: true,
            validator: (upk) => {
                return ["ProjectX", "TAGame"].indexOf(upk) !== -1;
            }
        }
    },
    data(){
        return {
            toggled: [],
            nodes: TAGameData
        }
    },
    methods: {
        toggle(node){
            let index = this.nodes.indexOf(node);
            if(this.toggled.includes(index)){
                this.toggled = this.toggled.filter(i => i !== index);
            }else this.toggled.push(index);
        },
        Ishidden(node){
            return this.toggled.includes(this.nodes.indexOf(node));
        }
    }
}
</script>

<style scoped>
.kismet-container h3 {
    text-transform: capitalize
}

.node-header{ 
    margin: 14px 0 0 0;
    width: inherit;
    background-color: var(--borderColor);
    padding: 6px 9px;
    min-height: 28px;
    display: flex;
    align-items: center;
    border-radius: 2px;
}

.node-header a, .node-header a:hover {
    color: var(--textColor);
    width: inherit;
    display: inherit;
    text-decoration: none !important;
}

.node-header span{
    margin-left: auto;
    padding-right: 8px;
}

</style>