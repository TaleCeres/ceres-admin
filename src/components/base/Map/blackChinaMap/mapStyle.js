export default {
  styleJson: [
    {
      featureType: 'water',
      elementType: 'all',
      stylers: {
        color: '#050505',
      },
    },
    {
      featureType: 'land',
      elementType: 'all',
      stylers: {
        color: '#131313',
      },
    },
    // 分界线
    {
      featureType: 'boundary',
      elementType: 'geometry',
      stylers: {
        color: '#064f85',
      },
    },
    // 铁路
    {
      featureType: 'railway',
      elementType: 'all',
      stylers: {
        visibility: 'off',
      },
    },
    // 公路
    {
      featureType: 'highway',
      elementType: 'geometry',
      stylers: {
        color: '#004981',
      },
    },
    {
      featureType: 'highway',
      elementType: 'geometry.fill',
      stylers: {
        color: '#005b96',
        lightness: 1,
      },
    },
    {
      featureType: 'highway',
      elementType: 'labels',
      stylers: {
        visibility: 'off',
      },
    },
    // 动脉
    {
      featureType: 'arterial',
      elementType: 'geometry',
      stylers: {
        color: '#004981',
      },
    },
    {
      featureType: 'arterial',
      elementType: 'geometry.fill',
      stylers: {
        color: '#00508b',
      },
    },
    // 兴趣点如房子
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: {
        visibility: 'off',
      },
    },
    // 草地
    {
      featureType: 'green',
      elementType: 'all',
      stylers: {
        color: '#056197',
        visibility: 'off',
      },
    },
    // 低下通道
    {
      featureType: 'subway',
      elementType: 'all',
      stylers: {
        visibility: 'off',
      },
    },
    // 人造的
    {
      featureType: 'manmade',
      elementType: 'all',
      stylers: {
        visibility: 'off',
      },
    },
    {
      featureType: 'local',
      elementType: 'all',
      stylers: {
        visibility: 'off',
      },
    },
    {
      featureType: 'arterial',
      elementType: 'labels',
      stylers: {
        visibility: 'off',
      },
    },
    {
      featureType: 'boundary',
      elementType: 'geometry.fill',
      stylers: {
        color: '#029fd4',
      },
    },
    // 建筑物
    {
      featureType: 'building',
      elementType: 'all',
      stylers: {
        color: '#1a5787',
      },
    },
    {
      featureType: 'label',
      elementType: 'all',
      stylers: {
        visibility: 'off',
      },
    },
  ],
}
