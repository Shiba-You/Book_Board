export default function Content({ children }) {
  return (
    <>
      <div classname="container">
        { children }
      </div>
      <hr />
      <footer>©︎ 2021 Shiba-You</footer>
    </>
  )
}