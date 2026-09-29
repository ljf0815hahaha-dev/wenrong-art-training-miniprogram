export const campusList = [
  { key: 'wenshan-main', label: '文山总校', location: '云南省文山壮族苗族自治州文山市', latitude: null, longitude: null },
  { key: 'yanshan-branch', label: '砚山分校', location: '云南省文山壮族苗族自治州砚山县', latitude: null, longitude: null },
  { key: 'guangnan-branch', label: '广南分校', location: '云南省文山壮族苗族自治州广南县', latitude: null, longitude: null },
  { key: 'funing-branch', label: '富宁分校', location: '云南省文山壮族苗族自治州富宁县', latitude: null, longitude: null },
  { key: 'wubei-branch', label: '五北分校', location: '云南省文山州 · 详细地址待配置', latitude: null, longitude: null },
  { key: 'mawu-branch', label: '马吴分校', location: '云南省文山州 · 详细地址待配置', latitude: null, longitude: null },
  { key: 'xichou-branch', label: '西畴分校', location: '云南省文山壮族苗族自治州西畴县', latitude: null, longitude: null },
  { key: 'malipo-branch', label: '麻栗坡分校', location: '云南省文山壮族苗族自治州麻栗坡县', latitude: null, longitude: null }
]

export const getCampus = key => campusList.find(item => item.key === key) || campusList[0]
