export default function getId() {
  return `id${Math.floor(Math.random() * 1e16).toString(16)}`
}
