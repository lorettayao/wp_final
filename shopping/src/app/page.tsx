import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <header className="bg-pink-500 text-white p-4 w-full mb-8">
        <h1 className="text-3xl font-semibold ">Shopping Mall</h1>
      </header>
      {/* Item Boxes */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Item Box 1 */}
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product 1</h2>
          <p className="text-gray-600 mb-4">Description of Product 1.</p>
          <p className="text-blue-500 font-semibold">$19.99</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
        </div>

        {/* Item Box 2 */}
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product 2</h2>
          <p className="text-gray-600 mb-4">Description of Product 2.</p>
          <p className="text-blue-500 font-semibold">$29.99</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
        </div>

        {/* Add more item boxes as needed */}
      </section>
    </main>
  )
}
