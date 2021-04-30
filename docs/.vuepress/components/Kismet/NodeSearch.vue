<template>
  <div class="autocomplete">

    <!-- Search input and buttons to submit / cancel the search -->
    <input
      class="autocomplete-input"
      type="text"
      placeholder="Search..."
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <button 
        class="autocomplete-input" 
        @click="resetResult()" 
        :style="{ color: search.length > 0 ? 'var(--textColor)': 'var(--blockquoteBorderColor)' }"
    >
        &#128473;
    </button>
    <button 
        class="autocomplete-input" 
        :style="{ color: results.includes(search) && isOpen ? 'var(--textColor)': 'var(--blockquoteBorderColor)' }" 
        @click="showResult(search)"
    >
        &#x1F50E;&#xFE0E;
    </button>

    <!-- Filter options -->
    <div class="autocomplete-options" v-if="isOpen">
      <p>Filter:</p>
      <a
        v-for="option in category"
        :key="option"
        v-on:click="setType(option)"
        :class="{ active: active === option }"
      >
        {{ option }}
      </a>
    </div>

    <!-- Search suggestions -->
    <ul
      id="autocomplete-results"
      v-show="isOpen && results.length > 0"
      class="autocomplete-results"
    >
      <li v-if="results.length > 2" class="results-title">
        {{ suggestedText() }}
      </li>
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>

    <!-- Displayed when there are no results -->
    <p 
      class="results-title" 
      v-if="isOpen && results.length === 0 && search.length > minChar"
    >
        There are no {{ noResultsText() }}
    </p>

    <!-- Found kismet node -->
    <div v-if="!isOpen && search && match">
      <KismetNode
        :node="match"
        :category="categoryName(search)"
      />
    </div>
  </div>
</template>

<script>

import TAGameData from '../../public/data/kismet_nodes.json';

export default {
  props: {
    categories: {
      type: String,
      required: true,
      validator: (value) => {
        let values = value.includes(",") ? value.split(",") : [value];

        for (let type of values) {
          if (!["actions", "events"].includes(type)) return false;
        }
        return true;
      }
    }
  },
  data() {
    return {
      isOpen: false,
      results: [],
      match: null,
      search: "",
      active: "all",
      arrowCounter: -1,
      minChar: 2,
      items: TAGameData.map((i) => i.name),
      nodes: TAGameData,
      category: []
    }
  },

  watch: {
    items: function (value, oldValue) {
      if (value.length !== oldValue.length) {
        this.results = value;
      }
    },
  },

  created(){

      let types = this.categories.includes(",") ? this.categories.split(",") : [this.categories];

      this.category = ["all"].concat(types); 

      let url = window.location.search;

      if (url && url.includes('?') && url.includes('=')) {

          const [type, query] = url.split('=');

          if (type.charAt( 0 ) === '?' && ['search'].includes(type.slice(1))) return;

          const name = query.replaceAll('_',' ').split(' ').map(word => {
              return word[0].toUpperCase() + word.slice(1)
          }).join(' ');

          this.showResult(name);
      }
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.match = this.findNode(result);
      this.arrowCounter = -1;
    },

    setType(option) {
      this.active = option;
      this.filterResults();
    },

    resetResult(){
      this.search = ''; 
      this.results = []; 
      this.isOpen = false; 
      this.active = 'all'; 
      this.arrowCounter = -1;
      this.match = null;
    },

    showResult(name) {
      if (this.items.includes(name)) this.setResult(name);
    },

    filterResults() {
      if (this.search.length > this.minChar) {
        this.results = this.items.filter((item) => {
          if (
            this.active === "all" ||
            this.nodes.find((x) => x.name === item).type ===
              this.active.slice(0, -1)
          ) {
            return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
          }
        });
      }else this.results = [];
    },

    findNode(name) {
      return this.nodes.find(x => x.name === name);
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },

    onChange() {
      this.$emit("input", this.search);

      this.filterResults();
      this.isOpen = true;
    },

    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },

    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
      this.match = this.nodes.find((x) => x.name === this.search);
    },

    categoryName(name) {
      let type = this.findNode(name).type;

      return `${type[0].toUpperCase() + type.slice(1)}s`;
    },

    suggestedText() {
      return this.active === "all" ? "Suggested nodes:" : `Suggested ${this.active}:`;
    },

    noResultsText(){
      return `${this.active === "all" ? "results for" : `results for ${this.active} matching`}: ${this.search}`
    }
  },
};
</script>

<style scoped> 
.autocomplete {
  position: relative;
}

.autocomplete-input {
  background-color: var(--highlightedBgColor);
  border: none;
  color: var(--textColor);
  padding: 0 11px  !important;
  border-radius: 3px;
  height: 35px;
  max-width: fit-content !important;
}
.autocomplete-input::placeholder {
    color: var(--textColor);
}
.autocomplete-results {
  padding: 3px;
  margin: 0;
  border: 1px solid var(--borderColor);
  height: fit-content;
  border-radius: 3px;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.results-title {
  list-style: none;
  color: var(--blockquoteBorderColor);
  font-style: italic;
}

.autocomplete-result.is-active,
 .autocomplete-result:hover {
    background-color: var(--accentColor);
    color: var(--textColor);
}

.autocomplete-options {
  display: flex;
  flex-direction: row;
  align-items: center;
}
 .autocomplete-options a {
   margin: 8px;
  color: var(--textColor);
  text-decoration: none;
}
.autocomplete-options .active {
  color: var(--accentColor) !important;
}
</style>