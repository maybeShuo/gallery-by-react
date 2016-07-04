
//获取图片相关数据
const imageData = require("../data/imageData.json");

//生成图片路径
function genImageURL() {
    imageData.map((item) => {
        item.imageURL = "assets/images/" + item.fileName;
    });
}
genImageURL();

let ImgFigure = React.createClass({
    render: function() {
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
});

const GalleryByReactApp = React.createClass({
    render: function() {
        let controllerUnits = [],
            imgFigures = [];

        imageData.map((item) => {
            imgFigures.push(<ImgFigure data={item}>);
        });

        return (
            <section className="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                </nav>
            </section>
        );
    }
});


ReactDOM.render(
  <GalleryByReactApp />,
  document.getElementById('content')
);
