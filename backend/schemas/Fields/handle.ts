import { text } from '@keystone-6/core/fields'
import { BaseListTypeInfo, FieldTypeFunc } from '@keystone-6/core/types'
import { getHandle } from '../../lib/stringHelpers'

const handle = (createFromField: string, indexed?: true | 'unique' | undefined): FieldTypeFunc<BaseListTypeInfo> =>
  text({
    
    hooks: {
      resolveInput: ({ operation, resolvedData ,inputData,item}) => {
        let handle
        if (['create'].includes(operation) && resolvedData[createFromField]) {
          handle=resolvedData[createFromField]
        }
        if (['update'].includes(operation)) {
          if(inputData.handle){
            handle=inputData.handle
          }
          handle=item.handle
        }
        return getHandle(handle)
      },
    },
    isIndexed: indexed,
  })

export default handle
