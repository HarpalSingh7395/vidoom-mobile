import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from '~/lib/icons/Loader'
import DateTimePicker from '~/components/ui/date-time-picker' // Custom RN DateTimePicker
import { cn } from '~/lib/utils'

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  datetime: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a valid date",
  }),
})

type FormData = z.infer<typeof formSchema>

type ScheduleMeetingFormProps = {
  onSubmit?: (data: FormData) => void
}

export default function ScheduleMeetingForm({ onSubmit }: ScheduleMeetingFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      datetime: new Date(),
    },
  })

  const onSubmitForm = async (values: FormData) => {
    console.log(values)
    await onSubmit?.(values)
  }

  return (
    <View className="flex flex-col gap-6">
      {/* Name Field */}
      <View className="flex flex-col gap-1">
        <Text className="text-base font-semibold text-black">Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={cn(
                'border border-gray-300 rounded-lg px-4 py-2 text-base bg-white',
                errors.name && 'border-red-500'
              )}
              placeholder="Enter name..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Text className="text-xs text-gray-500">This is meeting public display name.</Text>
        {errors.name && <Text className="text-red-500 text-sm">{errors.name.message}</Text>}
      </View>

      {/* DateTime Picker */}
      <View className="flex flex-col gap-1">
        <Text className="text-base font-semibold text-black">Start At</Text>
        <Controller
          control={control}
          name="datetime"
          render={({ field: { onChange, value } }) => (
            <DateTimePicker value={value} onChange={onChange} />
          )}
        />
        <Text className="text-xs text-gray-500">Select the date and time for your meeting.</Text>
        {errors.datetime && <Text className="text-red-500 text-sm">{errors.datetime.message}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl items-center"
        onPress={handleSubmit(onSubmitForm)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 /> : <Text className="text-white text-base font-semibold">Create Meeting</Text>}
      </TouchableOpacity>
    </View>
  )
}
