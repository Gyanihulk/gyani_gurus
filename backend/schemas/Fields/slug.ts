import { text } from '@keystone-6/core/fields'
import { BaseListTypeInfo, FieldTypeFunc } from '@keystone-6/core/types'
import { getSlug } from '../../lib/stringHelpers'

const slug = (createFromField: string, indexed?: true | 'unique' | undefined): FieldTypeFunc<BaseListTypeInfo> =>
  text({
    hooks: {
      resolveInput: ({ operation, resolvedData ,inputData,item}) => {
        let slug
        if (['create'].includes(operation) && resolvedData[createFromField]) {
          slug=resolvedData[createFromField]
        }
        if (['update'].includes(operation)) {
          slug=inputData.slug?inputData.slug:item?.slug
        }
        return getSlug(slug)
      },
    },
    isIndexed: indexed,
  })

export default slug
