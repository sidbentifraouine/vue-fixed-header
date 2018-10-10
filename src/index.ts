import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class VueFixedHeader extends Vue {
  $: (selector: string) => any = () => null
  check: () => void = () => null
  tag: string | null = null

  @Prop({ default: 0, type: Number })
  threshold!: number

  @Prop()
  _window: any

  @Prop()
  _navigator: any

  @Prop()
  _document: any

  mounted() {
    this.$ = (e: string) => document.querySelector(e)
    this.tag = this.getTargetTag()
    this.main()
  }

  getTargetTag() {
    const n = this._navigator || navigator
    const w = this._window || window
    const d = this._document || document

    if (n.userAgent.includes('Edge')) return 'body'
    if (!w.chrome && 'WebkitAppearance' in d.documentElement.style)
      return 'body'
    return 'html'
  }

  registerEvent() {
    const w = this._window || window
    w.addEventListener('scroll', this.check)
  }

  removeEvent() {
    const w = this._window || window
    w.removeEventListener('scroll', this.check)
  }

  main() {
    this.check = () => {
      const { $, tag, threshold } = this
      if (!tag) {
        return
      }
      this.$emit('update:fixed', $(tag).scrollTop > threshold)
    }
    this.registerEvent()
  }

  beforeDestroy() {
    this.removeEvent()
  }

  render() {
    const children = this.$slots.default
    return children[0]
  }
}
