let effectCb;
class Dep {
    constructor(val) {
        this._value = val;
        this.effectArr = new Set()
    }
    get value() {
        this.depend()
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.notice();
    }
    notice() {
        this.effectArr.forEach(effect => {
            effect();
        });
    }
    depend () {
        if(effectCb) {
            this.effectArr.add(effectCb)
        }

    }
}
function effectWatch(effect) {
    effectCb = effect;
    effect()
    effectCb = null;
}
// b的值依赖于value, 当value发生改变时需要触发注册，执行对应动作
let dep = new Dep(10)
let b = 0;
effectWatch(() => {
    b = dep.value + 10;
    console.log(b);
})
dep.value = 1;