import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'

type Props = {
  value: Date
  onChange: (date: Date) => void
}

const DateTimePicker: React.FC<Props> = ({ value, onChange }) => {
  const [isPickerVisible, setPickerVisible] = useState(false)

  const handleConfirm = (date: Date) => {
    setPickerVisible(false)
    onChange(date)
  }

  return (
    <View>
      <TouchableOpacity
        className="border border-gray-300 px-4 py-2 rounded-lg bg-white"
        onPress={() => setPickerVisible(true)}
      >
        <Text className="text-base text-black">{format(value, 'PPpp')}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        date={value}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
        display="default"
      />
    </View>
  )
}

export default DateTimePicker
