const calculateMobileX = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    return Math.cos(angle) * 150 + 150; //radius
}

export default calculateMobileX;