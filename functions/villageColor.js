function villageColor(village) {
  switch (village) {
    case 'leaf village':
      return '#94fc9d'
    case 'cloud village':
      return '#CDDADD'
    case 'grass village':
      return '#C0E9C0'
    case 'hot springs village':
      return '#FBC089'
    case 'mist village':
      return '#C7E9FF'
    case 'rain village':
      return '#D4D4FF'
    case 'sand village':
      return '#F1E2A4'
    case 'sound village':
      return '#F6D5F6'
    case 'star village':
      return '#F2F2B9'
    case 'rock village':
      return '#E4C9A5'
    case 'waterfall village':
      return '#D5F6F1'
    case 'whirling tides village':
      return '#56CAF8'
    case '':
      return '#ffffff'
  }
}

export default villageColor
