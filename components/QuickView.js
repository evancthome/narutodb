import Image from 'next/image'
import Link from 'next/link'
import useCapitalize from '../hooks/useCapitalize'
import useVillageColor from '../hooks/useVillageColor'

function QuickView({ c }) {
  const vColor = useVillageColor(c.village)

  // switch (c.village) {
  //   case 'leaf village':
  //     vColor = '#94fc9d'
  //     break
  //   case 'cloud village':
  //     vColor = '#CDDADD'
  //     break
  //   case 'grass village':
  //     vColor = '#C0E9C0'
  //     break
  //   case 'hot springs village':
  //     vColor = '#FBC089'
  //     break
  //   case 'mist village':
  //     vColor = '#C7E9FF'
  //     break
  //   case 'rain village':
  //     vColor = '#D4D4FF'
  //     break
  //   case 'sand village':
  //     vColor = '#F1E2A4'
  //     break
  //   case 'sound village':
  //     vColor = '#F6D5F6'
  //     break
  //   case 'star village':
  //     vColor = '#F2F2B9'
  //     break
  //   case 'rock village':
  //     vColor = '#E4C9A5'
  //     break
  //   case 'waterfall village':
  //     vColor = '#D5F6F1'
  //     break
  //   case 'whirling tides village':
  //     vColor = '#56CAF8'
  //     break
  //   case 'unknown':
  //     vColor = '#FFFFFF'
  //     break
  // }

  return (
    <div style={{ backgroundColor: vColor }} className='quick-view'>
      <Image
        className='avatar'
        layout='fixed'
        width='150px'
        height='150px'
        src={c.avatarSrc}
      />
      <div className='quick-info'>
        <h3>
          <Link href={`/characters/${c._id}`}>{c.name}</Link>
        </h3>
        <p className='semibold'>{useCapitalize(c.village)}</p>
        <p className='semibold'>
          {c.rank === 'Unknown' ? `${c.rank} Rank` : c.rank}
        </p>
        <p>{c.description}</p>
      </div>
    </div>
  )
}

export default QuickView
