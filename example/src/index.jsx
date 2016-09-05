import React from 'react';
import ReactDOM from 'react-dom';
import Sticker from '../../Stickyfill';


const App = React.createClass({
	getDefaultProps(){
		return {
			media: "(max-width: 767px) and (orientation: portrait), (max-width: 1019px) and (orientation: landscape)"
		}
	},
	mediaMatch(media){
		return window.matchMedia(media).matches;
	},
	getInitialState(){
		return {
			stickerActive: false
		}
	},
	changeState(){
		this.setState({
			stickerActive: this.mediaMatch(this.props.media)
		})
	},
	componentDidMount(){
		window.addEventListener('resize', this.changeState);
		this.changeState();
	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.changeState);
	},
	render(){
		return (
			<div className="root">
				<div className="section before">
					<h2>Scroll down</h2>
				</div>
				<div className="section parent cf">
					<Sticker>
						<div className="child">
							<h2>Sticky box</h2>
						</div>
					</Sticker>
				</div>
				<div className="section parent2 cf">
					<Sticker media={this.props.media}>
						<div className={ !this.state.stickerActive ? "child2" : "child2-active" }>
							<h2>Sticky box with media</h2>
							<p className="note">
								works only on <span className="media">{this.props.media}</span>
								because of media prop passed to Sticker component
							</p>
						</div>
					</Sticker>
				</div>
				<div className="section after">
					<h2>Scroll back</h2>
				</div>
			</div>
		);
	}
});


ReactDOM.render(
	(
		<App />
	),
	document.getElementById('app')
);