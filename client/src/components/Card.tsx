import NewCard from './NewCard'

type data = {
  title: string,
  img: string,
  author: string,
  bookName: string,
  id: string,
}

const Card = (data: data) => {

  return (
    <section className=" max-w-[1200px] flex flex-col gap-4 m-auto mb-9">
    <div className="ml-6 mt-2">
      <h1 className='font-semibold text-xl'>{data.title}</h1>
    </div>
    <div id="scroll"  className="overflow-auto whitespace-nowrap mb-3">
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
      <NewCard img={data.img} id={data.id} author={data.author} bookName={data.bookName}/>
    </div>
  </section>
  )
}

export default Card