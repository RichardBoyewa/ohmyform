import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'

interface Data {
  form: {
    id
  }
}

interface Variables {
  id: string
}

const MUTATION = gql`
  mutation deleteUser($id: ID!) {
    form: deleteUser(id: $id) {
      id
    }
  }
`

export const useUserDeleteMutation = (
  options: MutationHookOptions<Data, Variables> = {}
): MutationTuple<Data, Variables> => {
  const oldUpdate = options.update

  options.update = (cache, result, options) => {
    cache.evict({
      fieldName: 'listUsers',
    })
    cache.gc()

    if (oldUpdate) {
      oldUpdate(cache, result, options)
    }
  }

  return useMutation<Data, Variables>(MUTATION, options)
}
