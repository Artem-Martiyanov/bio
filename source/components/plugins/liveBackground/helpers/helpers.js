export const getRandom = (min, max) =>  Math.random() * (max - min) + min // не включая min
export const createElement = (tagName, className) => {
    const element = document.createElement(tagName)
    element.classList.add(className)
    return element
}





