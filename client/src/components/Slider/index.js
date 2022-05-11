import React, { Component, Children, cloneElement } from 'react';
import styles from './Slider.module.scss';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            pages: [],
        };
    }

    usege = () => {
        this.setState(
            {
                pages: Children.map(this.props.children, (child) => {
                    return cloneElement(child, {
                        style: {
                            height: '100%',
                            maxWidth: '100%',
                            minWidth: '100%',
                        },
                    })
                })
            }
        )
    }

    prevSlide = () => {
        this.setState(
            {
                offset: (this.state.offset + 200) === 200 ? -200 * 3 : (this.state.offset + 200),
            }
        )
    }

    nextSlide = () => {
        this.setState(
            {
                offset: (this.state.offset - 200) === -200 * 4 ? 0 : (this.state.offset - 200),
            }
        )
    }

    componentDidMount = () => {
        this.usege();
    };

    render() {
        return (
            <div className={styles.slider}>
                <div className={styles.sliderContainer}>
                    <div className={styles.sliderLine}>
                        <div
                            className={styles.slideContainer}
                            style={{ transform: `translateX(${this.state.offset}px)` }}
                        >
                            {this.state.pages}
                        </div>
                    </div>
                </div>
                <div className={styles.sliderBtns}>
                    <button onClick={() => this.prevSlide()} className={styles.prev}>
                        <img src='/img/whiteArrow.svg' alt='arrow'></img>
                    </button>
                    <button onClick={() => this.nextSlide()} className={styles.next}>
                        <img src='/img/whiteArrow.svg' alt='arrow'></img>
                    </button>
                </div>
            </div>
        )
    }
}

export default Carousel;
