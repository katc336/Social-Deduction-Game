const calculateX = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    return Math.cos(angle) * 350 + 700; //radius
}

export default calculateX;