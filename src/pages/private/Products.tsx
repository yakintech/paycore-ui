import React from 'react'
import { useQuery } from 'react-query'


function Products() {

    const { isLoading, error, data } = useQuery('products', () =>
        fetch('https://northwind.vercel.app/api/products').then(res =>
            res.json()
        )
    ,
    {staleTime: 20000})
    
  return (<>
    <h1>Products Page</h1>
    {isLoading ? (
        <h1>Loading...</h1>
    ) : error ? (
        <h1>Error</h1>
    ) : (
        <div>
           <table>
                <thead>
                     <tr>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Quantity Per Unit</th>
                     </tr>
                </thead>
                <tbody>
                     {data.map((item : any) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.quantityPerUnit}</td>
                          </tr>
                     ))}
                </tbody>
           </table>
        </div>
    )}
  </>
  )
}

export default Products