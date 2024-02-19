export const createOrder =async({name,phone,address,totalPrice})=>{
    const res=await fetch('/api/order',{
        method:"POST",
        body:JSON.stringify({
            name: name,
            phone: phone,
            address: address,
            totalPrice: parseFloat(totalPrice)
        }),
    });
    const id=await res.json();
    return id;
}