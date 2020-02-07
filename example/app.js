(function () {
  'use strict';

  const targetMap = new WeakMap();
  let activeEffect = null;
  function track(target) {
      // target(ref)のvalueプロパティに依存している関数リスト(deps)を取得する
      let deps = targetMap.get(target);
      // depsがなければ初期化する
      if (deps === undefined) {
          deps = new Set();
          targetMap.set(target, deps);
      }
      // 現在実行中のeffect関数をdepsに追加する
      if (activeEffect && !deps.has(activeEffect)) {
          deps.add(activeEffect);
      }
  }
  function trigger(target) {
      const deps = targetMap.get(target);
      if (deps === undefined) {
          return;
      }
      // targetに依存しているeffect全てを再度実行する
      deps.forEach(effect => {
          effect();
      });
  }
  function effect(fn) {
      activeEffect = fn;
      fn();
  }

  function ref(value) {
      const ref = {
          get value() {
              track(ref);
              return value;
          },
          set value(newVal) {
              value = newVal;
              trigger(ref);
          }
      };
      return ref;
  }

  function computed(getter) {
      let value;
      effect(() => {
          value = getter();
      });
      return {
          get value() {
              return value;
          }
      };
  }

  const countElement = document.getElementById('count');
  const multipliedElement = document.getElementById('multiplied');
  const incrementButton = document.getElementById('increment');
  const decrementButton = document.getElementById('decrement');
  if (countElement && multipliedElement && incrementButton && decrementButton) {
      const count = ref(0);
      const multiplied = computed(() => count.value * 2);
      incrementButton.addEventListener('click', () => {
          count.value++;
      });
      decrementButton.addEventListener('click', () => {
          count.value--;
      });
      effect(() => {
          countElement.innerText = String(count.value);
          multipliedElement.innerText = String(multiplied.value);
      });
  }

}());
