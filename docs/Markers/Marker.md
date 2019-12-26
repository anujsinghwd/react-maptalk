
## <Marker. />

### props
| Prop | Type | Default | Required |
| ---- | :--: | :-----: | :------: |
| lat | `number` | `28.774929` | `false` | 
| lon | `number` | `78.419416` | `false` | 
| visible | `bool` | `true` | `false` | 
| cursor | `String` | `pointer` | `false` | 
| shadowBlur | `number` | `0` | `false` | 
| shadowColor | `String` | `black` | `false` | 
| draggable | `bool` | `false` | `false` | 
| dragShadow | `bool` | `false` | `false` | 
| textFaceName | `String` | `sans-serif` | `false` | 
| textName | `String` | `ReactMapTalks` | `false` | 
| textFill | `String` | `#34495e` | `false` | 
| textHorizontalAlignment | `String` | `right` | `false` | 
| textSize | `number` | `40` | `false` | 
| textName | `String` | `ReactMapTalks` | `false` | 

```jsx
import  React, { Component } from  'react'
import { ReactMaptalk, Marker } from  'react-maptalk'
class  Example  extends  Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	onMapClick(props, map, e){
		// todo
	}
	render () {
		return(
		<ReactMaptalk
			lat={27.453}
			lon={78.32432}
			zoom={12}
			style="dark"
			centerAroundCurrentLocation={true}
			onClick={this.onMapClick}
		/>
        <Marker 
            textSize={15}
        />
		);
	}
}
```
