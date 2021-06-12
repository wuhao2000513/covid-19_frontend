const google = window.google;
const {
  CIRCLE,
  POLYGON,
  POLYLINE,
  RECTANGLE
} = google.maps.drawing.OverlayType;
const polyOptions = {
  fillOpacity: 0.3,
  strokeWeight: 1,
  clickable: false,
  editable: true,
  zIndex: 1,
  fillColor: "#ff0000"
};
const defaultOption = {
  drawingMode: google.maps.drawing.OverlayType.MARKER,
  drawingControl: true,
  drawingControlOptions: {
    position: google.maps.ControlPosition.TOP_CENTER,
    drawingModes: [
      // google.maps.drawing.OverlayType.MARKER,
      CIRCLE,
      POLYGON,
      POLYLINE,
      RECTANGLE
    ]
  },
  markerOptions: {
    icon:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
  },
  rectangleOptions: polyOptions,
  circleOptions: polyOptions,
  polygonOptions: polyOptions
};

class DrawingManager {
  constructor(map, option = {}) {
    this.map = map;
    this.DM = null;
    this.currentShap = null;
    this.option = Object.assign(defaultOption, option);
    // 初始化地图绘图工具
    this.init();
  }
  init() {
    this.DM = new google.maps.drawing.DrawingManager(this.option);
    this.DM.setMap(this.map);
    // 绑定事件
    this.bindEvent();
  }
  //绘图完成事件
  bindEvent() {
    const self = this;
    google.maps.event.addListener(this.DM, "overlaycomplete", function (event) {
      self.currentShap = event.overlay;
      const type = event.type;
      console.log(event.overlay, type, "event.overlay");
      let bounds;
      let tempBounds = new google.maps.LatLngBounds();
      if (type == POLYGON || type == POLYLINE) {
        bounds = event.overlay
          .getPath()
          .getArray()
          .map(path => {
            let jsonData = path.toJSON();
            tempBounds.extend(jsonData);
            return jsonData;
          });
        self.map.fitBounds(tempBounds);
      } else if (type == CIRCLE) {
        let latlng = event.overlay.getCenter().toJSON();
        bounds = [
          {
            lat: latlng.lat,
            lng: latlng.lng,
            radius: event.overlay.getRadius()
          }
        ];
        self.map.fitBounds(self.currentShap.getBounds());
      } else {
        const bud = event.overlay.getBounds();
        const sw = bud.getSouthWest().toJSON();
        const ne = bud.getNorthEast().toJSON();
        bounds = [
          {
            lat: sw.lat,
            lng: ne.lng
          },
          ne,
          {
            lat: ne.lat,
            lng: sw.lng
          },
          sw
        ];
        self.map.fitBounds(self.currentShap.getBounds());
      }
      self.map.setOptions({
        gestureHandling: "auto"
      });
      self.option.overlayComplete && self.option.overlayComplete(type, bounds);
      self.DM.setDrawingMode(null);
    });
  }
  //清除地图覆盖物
  clear() {
    this.currentShap && this.currentShap.setMap(null);
  }
  //在地图上画图形
  draw({ type, data }) {
    const position = data;
    console.log(type, data);
    this.DM.setDrawingMode(type);
    switch (type) {
      case "polygon":
      case "rectangle":
      case "polyline":
        this.currentShap = new window.google.maps.Polygon(
          Object.assign(polyOptions, {
            path: position,
            map: this.map
          })
        );
        // this.map.setMapCenter(position[0]);
        break;
      case "circle":
        this.currentShap = new window.google.maps.Circle(
          Object.assign(polyOptions, {
            radius: parseFloat(data[0].radius),
            center: position[0],
            map: this.map
          })
        );
        break;
    }
    // this.map.fitBounds(data);
  }
}

export default DrawingManager;
