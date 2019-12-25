
## <ReactMaptalk. />

### props
| Prop | Type | Default | Required |
| ---- | :--: | :-----: | :------: |
| lat | `number` | `28.774929` | `false` | 
| lon | `number` | `78.419416` | `false` | 
| zoom | `number` | `13` | `false` | 
| style | `String` | `light` | `false` | 
| centerAroundCurrentLocation | `boolean` | `false` | `false` | 
| onClick | `func` | `false` | `false` | 

```bash
import  React, { Component } from  'react'
import  ReactMaptalk  from  'react-maptalk'
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
		);
	}
}
```
