const getData = async (seccion) => {
    try {
        const server = await fetch('http://localhost:3001/' + seccion)     
        const data = await server.json();
        return data
                
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}
export default getData