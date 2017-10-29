
# Vue-Model-Vuex

_A custom Vue directive that mimics v-model to easily interact with Vuex stores_


## About

As soon as you introduce a Vuex store into your project, you can no longer use `v-model` on form elements to bind state from the store.

Using `v-model` will throw errors when it tries to update state following user input because a Vuex store must be updated by mutations (and actions) only.

You can get around this by implementing the longhand version of `v-model`, like so.

```html
<template>
  <input 
    class="input" 
    name="item" 
    type="text" 
    :value="item.value"
    @input="update"
  />
</template>
```

But now we lose the beauty and clarity of `v-model`! Enter `v-model-vuex`, which mimics `v-model` to allow us to bind the value and a method once again.


## Install

Install the directive using the following command

```
npm i vue-model-vuex
```


## Import

Add the directive into your project and register it with your Vue instance


```js
import Vue from 'Vue'
import store from './store'

import VueModelVuex from 'vue-model-vuex'

Vue.directive(VueModelVuex)

new Vue({
  el: '#app',
  store,
  template: '<App />',
  components: { App }
})
```


## Usage

Now you can use the directive on any element where you would have previously used `v-model`.

Using `v-model-vuex` requires a method name to be passed to the directive via a `:modifier`. This is how `v-model-vuex` knows which method to call when the event is triggered.

By default, `v-model-vuex` will attempt to bind the correct event trigger for the element (e.g, a `change` event handler would be bound to a `select` element). You can override this behaviour by passing the directive an `.argument` with the event name. See the example below.


## API
- `v-model-vuex` sets up the directive 
- `v-model-vuex:method` defines the method to be called when the data updates
- `v-model-vuex:method.handler` defines the event handler which triggers the method call


## Example

```vue    
<template>
  <!-- just pass the method name -->
  <!-- this would default to @input -->
  <input 
    class="input" 
    name="item" 
    type="text" 
    v-model-vuex:update="item.value"
  />
  
  <!-- optional, specify an event handler -->
  <!-- this would be @keyup -->
  <input 
    class="input" 
    name="item" 
    type="text" 
    v-model-vuex:update.keyup="item.value"
  />
</template>

<script>
  export default {
    data () {
      return {} // local state
    },
    computed : {
      // reference to store
      item () {
        return this.$store.state.item
      }
      
      // or use mapGetters
      ...mapGetters([
        'item'
      ])
    },
    methods : {
      // dispatch to store
      update (event) {
        this.$store.dispatch('updateItem', event)
      }
      
      // or use mapActions
      ...mapActions([
        'updateItem'
      ]),
      update (event) {
        this.updateItem(event)
      }
    }
  }
</script>
``` 

## Changelog


**v1.2.0**
- add better support for checkboxes, set `checked` prop not `value`

**v1.1.0**
- update default event handler to `input`, mimic `@input`

**v1.0.0**
- initial release


