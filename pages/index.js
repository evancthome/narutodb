import { request, gql } from 'graphql-request'
import { useInfiniteQuery } from 'react-query'
import { useDebounce } from 'use-debounce'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Loader from '../components/Loader'
import QuickView from '../components/QuickView'
import { useState, useEffect, useRef } from 'react'
import useCapitalize from '../hooks/useCapitalize'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

export default function Home() {
  const [name, setName] = useState('')
  const [village, setVillage] = useState({ value: '' })
  const [filters, setFilters] = useState({ name: name, village: village })
  const endpoint = 'https://narutoql.up.railway.app/graphql/'

  const [debouncedFilters] = useDebounce(filters, 275)

  const villages = [
    { label: 'All Villages', value: '' },
    { label: useCapitalize('cloud village'), value: 'cloud village' },
    {
      label: useCapitalize('hot springs village'),
      value: 'hot springs village',
    },
    { label: useCapitalize('leaf village'), value: 'leaf village' },
    { label: useCapitalize('mist village'), value: 'mist village' },
    { label: useCapitalize('rain village'), value: 'rain village' },
    { label: useCapitalize('sand village'), value: 'sand village' },
    { label: useCapitalize('sound village'), value: 'sound village' },
    { label: useCapitalize('star village'), value: 'star village' },
    { label: useCapitalize('rock village'), value: 'rock village' },
    { label: useCapitalize('waterfall village'), value: 'waterfall village' },
    {
      label: useCapitalize('whirling tides village'),
      value: 'whirling tides village',
    },

    // 'grass village',
    // 'hot springs village',
    // 'leaf village',
    // 'mist village',
    // 'rain village',
    // 'sand village',
    // 'sound village',
    // 'star village',
    // 'rock village',
    // 'waterfall village',
    // 'whirling tides village',
  ]

  useEffect(() => {
    setFilters({ name: name, village: village.value })
  }, [name, village])

  const cAll = useInfiniteQuery(
    ['characters', debouncedFilters],
    async ({ pageParam = 1 }) => {
      const res = await request(
        endpoint,
        gql`
          {
            characters(page: ${pageParam}, filter: {name: "${filters.name}", village: "${filters.village}"}) {
              info {
                count
                pages
                next
                prev
              }
              results {
                _id
                name
                avatarSrc
                description
                rank
                village
              }
            }
          }
        `,
      )
      return res
    },
    {
      // getPreviousPageParam: (pageParam) => pageParam.characters.info.previous,
      getNextPageParam: (pageParam) => {
        return pageParam.characters.info.next
      },
    },
  )

  const loadMoreButtonRef = useRef()

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: cAll.fetchNextPage,
    enabled: !!cAll.hasNextPage,
  })

  return (
    <div className='container'>
      <h1>narutoDB</h1>
      <input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder='Name'
      />

      <Dropdown
        options={villages}
        value={village.value}
        onChange={setVillage}
        labelledBy='All Villages'
      />

      {cAll.isError ?? <span>{cAll.error.message}</span>}

      {cAll.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='character-grid'>
            {cAll.data.pages.map((group) =>
              group.characters.results.map((c) => (
                <QuickView key={c._id} c={c} />
              )),
            )}
          </div>
          <button
            ref={loadMoreButtonRef}
            onClick={() => cAll.fetchNextPage()}
            disabled={!cAll.hasNextPage || cAll.isFetchingNextPage}
            className='load-more'
          >
            {cAll.isFetchingNextPage
              ? 'Loading more...'
              : cAll.hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </button>
        </>
      )}
    </div>
  )
}
