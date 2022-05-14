<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header"></slot>
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              <i class="lni lni-close"></i>
            </button>
        
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body"></slot>          
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 16px;
    background-color: rgba(0,0,0,.4);
    overflow: auto;
    z-index: 9999999;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
  }

  .modal {
    background: #fff;
    display: block;
    z-index: 9999999;
    -webkit-border-radius: 5px;
    border-radius: 2px;
    position: relative;
    -webkit-box-shadow: 0 14px 45px rgba(0,0,0,.25);
    box-shadow: 0 14px 45px rgba(0,0,0,.25);
    margin: 50px auto;
    overflow: initial;
    width: 100%;
    max-width: 380px;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -ms-transition: all .2s ease;
    transition: all .2s ease;
    padding: 20px;
    height: auto;
  }

  .modal-header{
    width: 100%;
    margin-bottom: 20px;
    font-size: 22px;
  }

  .modal-header {
    padding: 6px;
  }

  .modal-body {
    padding: 6px;
    width: 100%;
    overflow: hidden;
  }

  .btn-close {
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    padding: 2px 4px;
    font-size: 12px;
    color: #000000;
    margin-top: -2px;
  }
  .btn-close:focus {
    outline: none;
  }
  
  .btn-close:hover {
    color: red;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>