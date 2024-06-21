const calculateY = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    return Math.sin(angle) * 350 + 500; //radius
}

export default calculateY;