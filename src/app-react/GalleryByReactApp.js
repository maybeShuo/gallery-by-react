
//获取图片相关数据
const imageData = require("../data/imageData.json");

//生成图片路径
function genImageURL(){
    imageData.map((item) => {
        item.imageURL = "assets/images/" + item.fileName;
    });
}
genImageURL();

const GalleryByReactApp = React.createClass({
    render: function() {
        return (
            <section className="stage">
                <section className="img-sec">
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
