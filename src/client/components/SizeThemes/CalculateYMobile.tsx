const calculateMobileY = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    return Math.sin(angle) * 150 + 350; //radius
}

export default calculateMobileY;