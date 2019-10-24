import React from 'react'

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            allMemeImgs: []
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    onSubmitHandler(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImage: randMemeImg
        })
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({
                    allMemeImgs: memes
                })
            })
    }

    render() {
        return (
            <div>
                <h1 className = "title">Meme Generator</h1>
                <form>
                    <label>
                        Top Text
                        <input 
                            type = "text"
                            name = "topText" 
                            value = {this.state.topText} 
                            placeholder = "Enter Top Text" 
                            onChange = {this.onChangeHandler}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Bottom Text
                        <input 
                            type = "text" 
                            name = "bottomText"
                            value = {this.state.bottomText} 
                            placeholder = "Enter Bottom Text" 
                            onChange = {this.onChangeHandler}
                        /> 
                    </label>
                    <input type = "submit" value = "Generate" onClick = {this.onSubmitHandler} />
                </form>
                <div className="container">
                    <img src = {this.state.randomImage} alt = "Meme Image" className = "image" />
                    <div className="top">{this.state.topText}</div>
                    <div className="bottom">{this.state.bottomText}</div>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;