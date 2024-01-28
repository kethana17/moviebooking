package com.hexaware.cinema.service;

import com.hexaware.cinema.dto.AdminDTO;

public interface IAdminService {
    void addAdmin(AdminDTO adminDTO);

   public boolean verifyAdminCredentials(String username, String password);
}
