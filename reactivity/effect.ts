type Deps = Set<Function>
const targetMap = new WeakMap<object, Deps>()

let activeEffect: Function | null = null

export function track(target: object) {
  // target(ref)のvalueプロパティに依存している関数リスト(deps)を取得する
  let deps = targetMap.get(target)

  // depsがなければ初期化する
  if (deps === undefined) {
    deps = new Set()
    targetMap.set(target, deps)
  }

  // 現在実行中のeffect関数をdepsに追加する
  if (activeEffect && !deps.has(activeEffect)) {
    deps.add(activeEffect)
  }
}

export function trigger(target: object) {
  const deps = targetMap.get(target)
  if (deps === undefined) {
    return
  }

  // targetに依存しているeffect全てを再度実行する
  deps.forEach(effect => {
    effect()
  })
}

export function effect(fn: Function) {
  activeEffect = fn
  fn()
}
