1. Card, CardContent (card.tsx)
   Sử dụng ở: RescueCard.tsx
   Mục đích: Hiển thị thông tin từng incident/sự cố cứu hộ
   Tại sao cần: Tạo container đẹp, có border và shadow cho mỗi sự cố
2. Badge (badge.tsx)
   Sử dụng ở: RescueCard.tsx
   Mục đích: Hiển thị độ khẩn cấp (Khẩn cấp, Trung bình, Thấp)
   Tại sao cần: Làm nổi bật thông tin quan trọng với màu sắc khác nhau
3. Button (button.tsx)
   Sử dụng ở: RescueCard.tsx, FilterPanel.tsx
   Mục đích: Các nút bấm (Xem chi tiết, Reset filter)
   Tại sao cần: Component button nhất quán, có nhiều variants (default, outline, ghost...)
4. Checkbox (checkbox.tsx)
   Sử dụng ở: FilterPanel.tsx
   Mục đích: Lọc theo loại thảm họa
   Tại sao cần: Cho phép chọn nhiều loại thảm họa cùng lúc
5. RadioGroup, RadioGroupItem (radio-group.tsx)
   Sử dụng ở: FilterPanel.tsx
   Mục đích: Lọc theo độ khẩn cấp
   Tại sao cần: Chỉ chọn được 1 mức độ khẩn cấp
6. Label (label.tsx)
   Sử dụng ở: FilterPanel.tsx
   Mục đích: Nhãn cho checkbox và radio button
   Tại sao cần: Accessibility tốt hơn (click vào label cũng toggle được)
7. Input (input.tsx)
   Sử dụng ở: SearchBar.tsx
   Mục đích: Ô tìm kiếm
   Tại sao cần: Input field đẹp, nhất quán với hệ thống
8. Select, SelectContent, SelectItem, SelectTrigger, SelectValue (select.tsx)
   Sử dụng ở: ProvinceSelect.tsx
   Mục đích: Dropdown chọn tỉnh/thành phố
   Tại sao cấn: Select component có keyboard navigation và accessibility tốt
9. ScrollArea (scroll-area.tsx)
   Sử dụng ở: Sidebar.tsx
   Mục đích: Cuộn danh sách các incident
   Tại sao cần: Custom scrollbar đẹp hơn, consistent trên các trình duyệt
10. Collapsible, CollapsibleTrigger, CollapsibleContent (collapsible.tsx)
    Sử dụng ở: RescueCard.tsx
    Mục đích: Mở rộng/thu gọn chi tiết incident
    Tại sao cần: Tiết kiệm không gian, progressive disclosure
