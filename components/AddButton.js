import React, { Component } from 'react';
import { TouchableOpacity, Animated, Easing, View, StyleSheet } from 'react-native';

import { red } from '../helpers/colors';
import { Icon } from 'react-native-elements';

class AddButton extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.topLeftValue = new Animated.Value(0);
        this.topCenterValue = new Animated.Value(0);
        this.topRightValue = new Animated.Value(0);
        this.state = {
            pressed: false,
        };
    }

    goProspecto = () => {
        this.props.navigation.navigate('Prospecto')

        const { pressed } = this.state;
        if (pressed) {
            this.animateReverse(0);
        }
        else {
            this.animate(1);
        }
        this.setState({ pressed: !pressed });
    }

    goImport = () => {
        this.props.navigation.navigate('ImportarProspectos')

        // const { pressed } = this.state;
        // if (pressed) {
        //     this.animateReverse(0);
        // }
        // else {
        //     this.animate(1);
        // }
        // this.setState({ pressed: !pressed });
    }

    handleAddButtonPress = () => {
        const { pressed } = this.state;
        if (pressed) {
            this.animateReverse(0);
        }
        else {
            this.animate(1);
        }
        this.setState({ pressed: !pressed });
    }

    animate = (toValue) => {
        Animated.stagger(200, [
            Animated.parallel([
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue,
                        duration: 800,
                        easing: Easing.exp,
                    }
                ),
                Animated.timing(
                    this.topLeftValue,
                    {
                        toValue,
                        duration: 800,
                        easing: Easing.out(Easing.exp),
                    }
                ),
            ]),
            Animated.timing(
                this.topCenterValue,
                {
                    toValue,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                }
            ),
            Animated.timing(
                this.topRightValue,
                {
                    toValue,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                }
            ),
        ]).start();
    }

    animateReverse = (toValue) => {
        Animated.stagger(200, [
            Animated.timing(
                this.topRightValue,
                {
                    toValue,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                }
            ),
            Animated.timing(
                this.topCenterValue,
                {
                    toValue,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                }
            ),
            Animated.parallel([
                Animated.timing(
                    this.animatedValue,
                    {
                        toValue,
                        duration: 800,
                        easing: Easing.out(Easing.exp),
                    }
                ),
                Animated.timing(
                    this.topLeftValue,
                    {
                        toValue,
                        duration: 800,
                        easing: Easing.out(Easing.exp),
                    }
                ),
            ]),
        ]).start();
    }

    render() {

        const springValue = Animated.add(Animated.add(this.topLeftValue, this.topRightValue), this.topCenterValue);

        return (
            <View>
                <Animated.View
                    style={[
                        style.bigBubble,
                        {
                            transform: [
                                {
                                    rotateZ: springValue.interpolate({
                                        inputRange: [0, 1, 2, 3],
                                        outputRange: ['-45deg', '-45deg', '0deg', '45deg'],
                                    }),
                                },
                                {
                                    scaleY: springValue.interpolate({
                                        inputRange: [0, 0.65, 1, 1.65, 2, 2.65, 3],
                                        outputRange: [1, 1.1, 1, 1.1, 1, 1.1, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity
                        hitSlop={{
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        }}
                        // onPress={this.handleAddButtonPress}
                        onPress={this.goImport}
                    >
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        rotateZ: springValue.interpolate({
                                            inputRange: [0, 1, 2, 3],
                                            outputRange: ['45deg', '45deg', '45deg', '0deg'],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <Icon
                                name="plus"
                                size={35}
                                color="#FFF"
                                type="font-awesome"
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    style={[
                        style.smallBubble,
                        {
                            position: 'absolute',
                            transform: [
                                {
                                    translateX: this.topLeftValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, -40],
                                    }),
                                },
                                {
                                    translateY: this.topLeftValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [8, -60],
                                    }),
                                },
                                {
                                    rotateZ: this.topLeftValue.interpolate({
                                        inputRange: [0, 0.6, 1],
                                        outputRange: ['-90deg', '-45deg', '0deg'],
                                    }),
                                },
                                {
                                    scaleY: this.topLeftValue.interpolate({
                                        inputRange: [0, 0.8, 0.9, 1],
                                        outputRange: [1, 1.5, 1.5, 1],
                                    }),
                                },
                            ],
                            opacity: this.topLeftValue,
                            zIndex: -1,
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.goProspecto()
                        }}
                        hitSlop={{
                            left: 12,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        <Icon
                            name="add"
                            size={20}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </Animated.View>
                {/* <Animated.View
					style={[
						style.smallBubble,
						{
							position: 'absolute',
							transform: [
								{
									translateX: this.topCenterValue.interpolate({
										inputRange: [0, 1],
										outputRange: [30, 30],
									}),
								},
								{
									translateY: this.topCenterValue.interpolate({
										inputRange: [0, 1],
										outputRange: [8, -90],
									}),
								},
								{
									scaleY: this.topCenterValue.interpolate({
										inputRange: [0, 0.8, 0.9, 1],
										outputRange: [1, 1.5, 1.5, 1],
									}),
								},
							],
							opacity: this.topCenterValue,
							zIndex: -1,
						},
					]}
				>
					<Icon
						name="video-camera"
						size={20}
                        color="#FFF"
                        type="font-awesome"
					/>
				</Animated.View> */}
                <Animated.View
                    style={[
                        style.smallBubble,
                        {
                            position: 'absolute',
                            transform: [
                                {
                                    translateX: this.topRightValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 100],
                                    }),
                                },
                                {
                                    translateY: this.topRightValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [8, -60],
                                    }),
                                },
                                {
                                    rotateZ: this.topRightValue.interpolate({
                                        inputRange: [0, 0.6, 1],
                                        outputRange: ['90deg', '45deg', '0deg'],
                                    }),
                                },
                                {
                                    scaleY: this.topRightValue.interpolate({
                                        inputRange: [0, 0.8, 0.9, 1],
                                        outputRange: [1, 1.5, 1.5, 1],
                                    }),
                                },
                            ],
                            opacity: this.topRightValue,
                            zIndex: -1,
                        },
                    ]}
                >
                    <TouchableOpacity onPress={() => {
                        this.goImport()
                    }}
                        hitSlop={{
                            left: 12,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        <Icon
                            name="address-book"
                            size={20}
                            color="#FFF"
                            type="font-awesome"
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    bigBubble: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: red,
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        top: -30,
    },
    smallBubble: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: red,
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
    },
});

export default AddButton;