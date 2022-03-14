import { useRouter } from 'next/router'
import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'
import useCapitalize from '../../hooks/useCapitalize'
import useVillageColor from '../../hooks/useVillageColor'
import Link from 'next/link'
import Image from 'next/image'
import Loader from '../../components/Loader'

function Character() {
  const router = useRouter()
  const id = router.query.id

  const endpoint = 'https://narutoql.up.railway.app/graphql/'

  const { data, isLoading } = useQuery(id, () =>
    request(
      endpoint,
      gql`
        {
          character(id: "${id}") {
            name
            avatarSrc
            description
            village
            age
            nameMeaning
            notableFeatures
            rank
            notableQuotes
          }
        }
      `,
    ),
  )

  return (
    <>
      {!isLoading ? (
        <div
          className='character-view'
          style={{
            background: useVillageColor(data.character.village),
          }}
        >
          <div className='container'>
            <Link href='/'>Back</Link>
            <Image
              className='avatar'
              layout='fixed'
              width='150px'
              height='150px'
              src={data.character.avatarSrc}
            />
            <h2>{data.character.name}</h2>
            <p className='semibold'>{useCapitalize(data.character.village)}</p>
            <p className='semibold'>
              {data.character.rank === 'Unknown'
                ? `${data.character.rank} Rank`
                : data.character.rank}
            </p>
            {data.character.age != null ? (
              <p>
                <span className='semibold'>Age: </span>
                {data.character.age}
              </p>
            ) : null}
            {data.character.notableFeatures ? (
              <p>
                <span className='semibold'>Notable Features: </span>
                {data.character.notableFeatures}
              </p>
            ) : null}
            <p>{data.character.description}</p>
            {data.character.nameMeaning ? (
              <p>
                <span className='semibold'>Meaning of name:</span>{' '}
                {data.character.nameMeaning}
              </p>
            ) : null}
            {data.character.notableQuotes ? (
              <p>
                <span className='semibold'>Notable Quotes:</span>{' '}
                {data.character.notableQuotes}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default Character
