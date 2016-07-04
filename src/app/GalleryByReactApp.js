
//获取图片相关数据
const imageData = require("../data/imageData.json");

//生成图片路径
function genImageURL(){
    imageData.map((item) => {
        item.imageURL = "assets/images/" + item.fileName;
    });
}
genImageURL();

const GalleryByReactApp = React.createClass({displayName: "GalleryByReactApp",
    render: function() {
        return (
            React.createElement("section", {className: "stage"}, 
                React.createElement("section", {className: "img-sec"}
                ), 
                React.createElement("nav", {className: "controller-nav"}
                )
            )
        );
    }
});


ReactDOM.render(
  React.createElement(GalleryByReactApp, null),
  document.getElementById('content')
);
