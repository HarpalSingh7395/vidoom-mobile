import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from '~/lib/icons/Loader'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
})

type FormData = z.infer<typeof formSchema>

type JoinMeetingFormProps = {
  onSubmit?: (data: FormData) => void
}

export default function JoinMeetingForm({ onSubmit }: JoinMeetingFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  })

  const onSubmitForm = async (values: FormData) => {
    console.log(values)
    await onSubmit?.(values)
  }

  return (
    <View className="flex gap-4 flex-col">
      <View className="flex flex-col gap-">
        <Text className="text-base font-semibold text-black">Meeting Link</Text>
        <Controller
          control={control}
          name="url"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`border px-4 py-2 rounded-lg bg-white border-gray-300 ${
                errors.url ? 'border-red-500' : ''
              }`}
              placeholder="Paste meeting link here..."
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.url && <Text className="text-red-500 text-sm">{errors.url.message}</Text>}
      </View>

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl items-center"
        onPress={handleSubmit(onSubmitForm)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 /> : <Text className="text-white text-base font-semibold">Join Now</Text>}
      </TouchableOpacity>
    </View>
  )
}
